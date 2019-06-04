@extends('layouts.app')

@section('content')
<div class="container">
    <div class="card">
        <h3>Login</h3>
        <form action="/register" method="POST" style="padding-top: 40px">
            @if ($errors->any())
            <div class="panel-danger">
                @foreach ($errors->all() as $error)
                {{$error}}
                @endforeach
            </div>
            @endif
            @csrf
            <label>
                Name: 
                <input type="text" name="name" id="name" placeholder="John">
            </label>
            <label>
                Email: 
                <input type="email" name="email" id="email" placeholder="test@address.com">
            </label>
            <label>
                Password: 
                <input type="password" name="password" id="password" placeholder="••••••••">
            </label>
            <label>
                Password Confirm: 
                <input type="password" name="password_confirmation" id="password_conf" placeholder="••••••••">
            </label>
            <button class="btn btn-primary">Sign Up</button>
        </form>        
    </div>
</div>
@endsection
