const ROUTES = [ //It is an array which holds all the routes we need in our project.
  {
    url: "/manager",
    proxy: {
      target: "http://localhost:3333/",
      changeOrigin: true,   //One peculiar thing to notice is that we used the changeOrigin flag in our package. json file. 
                            //This flag changes the origin of the host header to the target URL thus enabling successful connection.
      pathRewrite: {
        [`^/manager`]: "",
      },
    },
  },
  {
    url: "/receptionist",
    proxy: {
      target: "http://localhost:4444/",
      changeOrigin: true,
      pathRewrite: {
        [`^/receptionist`]: "",
      },
    },
  }
];

exports.ROUTES = ROUTES;
