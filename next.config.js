module.exports = {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'access-control-allow-origin',
              value: '*',
            },
            {
              key: 'access-control-allow-methods',
              value: 'POST, GET, OPTIONS, DELETE',
            },
            {
              key: 'access-control-max-age',
              value: '86400',
            },

          ],
        },
      ]
    }
  }