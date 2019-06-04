<img src="./images.jpg" id="img" style="display: none">
<canvas id="canvas" style="position: fixed; background: none; z-index: -1; width:100%; heigt: 100%;"></canvas>
<script src="bundle.js"></script>

<style>
  body
  {
    margin: 0;
    height: 100vh;
  }
</style>
<script>
  document.getElementById("canvas").click(function(e) {
    setTimeout(() => {
    e.target.requestPointerLock();
    }, 2000)
  })
</script>