# Cake is easy to use

This code try to get one object if previosly was saved in cookie named 'someShit'.
If the object is got, update his count value, save in cookie the updated object and shows one alert.
Else initialize cookie 'someShit' with a json object. This json includes two fields: 'msg' and 'count'.

```
    const MINUTES_TO_EXPIRE = 1;
    const someShit = cake.getJSONCookie('someShit');
    console.log(someShit);
    if (someShit) {
      someShit.count++
      // update cookie
      updateCookie(someShit);
      alert(`eyyy some shit is here!! ${someShit.count}`);
    } else {
      // initialize cookie
      updateCookie({ msg: 'wtf', count: 0 });
    }

    function updateCookie(json) {
      cake.addJSONCookieWithExpiration('someShit', json, MINUTES_TO_EXPIRE, () => {
        alert('cookie someshit is expired');
      });
    }
```    
