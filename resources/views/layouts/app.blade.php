<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <link rel="stylesheet" href="app.css">
 
    </head>
    <body>
        <canvas id="canvas" style="position: fixed; background: none; z-index: -1;"></canvas>
        <img src="./images.jpg" id="img" style="display: none">
        <script src="bundle.js"></script>
        <nav><div class="title">RicardoCTF</div></nav>
        <div>
            @yield('content')
        </div>
    </body>
</html>
