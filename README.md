# super-skeleton

front-end pages skeleton creating

### setup

> npm install super-skeleton -D

配置 webapck.config.js

```
const SuperSkeleton = require('super-skeleton');

```

```
new SuperSkeleton({
    staticDir: path.join(__dirname, 'dist'),
    device: 'iPhone 6 Plus',
    domain: 'http://192.168.2.3:9100/skeleton/dist/',
    cookie: {},
    delay: 5000,
    color: '#efefef',
  }),

```

### next feature

- add new config about isAnimation
- support output base64 or png file
- add cookie
- add bin
