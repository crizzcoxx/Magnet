/* Next.js / MUI integration here: https://github.com/mui-org/material-ui/tree/master/examples/nextjs */
import Document, { Html, Head, Main, NextScript } from "next/document";
// styled-jsx included in Next.js by default
import flush from "styled-jsx/server";
import { ServerStyleSheet } from "styled-components";

import { getSessionFromServer, getUserScript } from '../lib/auth';

class MyDocument extends Document {
  static getInitialProps = ctx => {
    const sheet = new ServerStyleSheet();
    const user = getSessionFromServer(ctx.req);

    // Render app and page and get the context of the page with collected side effects.
    let pageContext;
    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext;
        return sheet.collectStyles(<Component {...props} />);
      };
      return WrappedComponent;
    });

    const styleTags = sheet.getStyleElement();

    return {
      ...user,
      ...page,
      pageContext,
      styleTags,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: pageContext.sheetsRegistry.toString()
            }}
          />
          {flush() || null}
        </React.Fragment>
      )
    };
  };

  render() {
    const { pageContext, user = {} } = this.props;

    return (
      <Html lang="en" dir="ltr">
        <Head>
          {/* You can use the head tag, just not for setting <title> as it leads to unexpected behavior */}
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/x-icon"
          />
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary.main}
          />
          <meta
            name="description"
            content="A badass, modern applicant tracking system built with Next.js. No training required"
          />
          <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.min.js"></script>
          {/* <link rel="stylesheet" type="text/css" href="/static/styles.css" /> */}
          <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/fomantic-ui@2.7.4/dist/semantic.min.css" />
          <link rel="stylesheet" type="text/css" href="Semantic-UI-Alert/Semantic-UI-Alert.css" />
          <script src="https://cdn.jsdelivr.net/npm/fomantic-ui@2.7.4/dist/semantic.min.js"></script>
          <script type="text/javascript" src="Semantic-UI-Alert/Semantic-UI-Alert.js"></script>
          {/* <link rel="stylesheet" type="text/css" href="/.semantic/dist/semantic.min.css" /> */}
          {/* <script src="/.semantic/dist/semantic.min.js" /> */}
        </Head>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
