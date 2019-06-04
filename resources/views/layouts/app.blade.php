<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Laravel</title>
    <link rel="stylesheet" href="/app.css">
    <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.6.95/css/materialdesignicons.min.css">

</head>
<body>
    <nav>
        <div class="container">
            <a href="/" class="title">RicardoCTF</a>
            @auth
            <div>
                <a href="/dashboard" class="btn btn-success">Dashboard</a>
                <form action="/logout" method="POST" style="display: inline;">
                    @csrf
                    <button class="btn btn-primary btn-bordered">Logout</button>
                </form>
                <span>{{\Auth::user()->name}}</span>
                    </div>
            @endauth
            @guest
                <div class="login">
                    <a href="/login">Login</a>  
                    <a href="/register" class="btn btn-primary" style="color: white; text-decoration: none;">Sign Up</a>  
                </div>
            @endguest
        </div>
    </nav>
    <div>
        @yield('content')
    </div>
</body>
</html>
