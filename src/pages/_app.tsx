import type { AppProps } from "next/app";
import { useRef, useEffect, memo, MemoExoticComponent } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
import Header from "../components/Header";

interface RetainedComponent {
  [key: string]: {
    component: any;
    scrollPos: number;
  };
}

const ROUTES_TO_RETAIN = ["/stations"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const retainedComponents = useRef<RetainedComponent>({});

  const isRetainableRoute = ROUTES_TO_RETAIN.includes(router.asPath);

  if (isRetainableRoute && !retainedComponents.current[router.asPath]) {
    const MemoComponent = memo(Component);
    retainedComponents.current[router.asPath] = {
      component: <MemoComponent {...pageProps} />,
      scrollPos: 0,
    };
  }

  const handleRouteChangeStart = () => {
    if (isRetainableRoute) {
      retainedComponents.current[router.asPath].scrollPos = window.scrollY;
    }
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router.asPath]);

  useEffect(() => {
    if (isRetainableRoute) {
      window.scrollTo(0, retainedComponents.current[router.asPath].scrollPos);
    }
  }, [Component, pageProps]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div>
        <div style={{ display: isRetainableRoute ? "block" : "none" }}>
          {retainedComponents.current &&
            Object.entries(retainedComponents.current).map(([path, c]) => (
              <div
                key={path}
                style={{ display: router.asPath === path ? "block" : "none" }}
              >
                {c.component}
              </div>
            ))}
        </div>
        {!isRetainableRoute && <Component {...pageProps} />}
      </div>
    </>
  );
}
