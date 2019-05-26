<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <link rel="stylesheet" href="app.css">
 
    </head>
    <body>
        <img src="./images.jpg" id="img" style="display: none">
        <nav>
            <div class="title">RicardoCTF</div>
            <div class="login">
                <a href="/login">Login</a>

            </div>
        </nav>
        <div>
            @yield('content')
        </div>
    </body>
</html>
