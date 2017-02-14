
  let updateCalculation = function(settings) {

    let els = document.querySelectorAll('[data-value]');

    function animate() {
      els.forEach(function(el) {
        let address = el.getAttribute('data-value').split('.');
        let value = settings;
        address.forEach(function(address){
          try {
            if(value[address] !== 'undefined') value = value[address];
          } catch (e) {

          }
        });
        if(typeof value == 'number') value = Math.round(value * 100) / 100;
        el.innerText = value;
      });
      requestAnimationFrame(animate);

    }
    animate();

  }

  export default updateCalculation;
