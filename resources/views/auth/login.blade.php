@extends('layouts.app')

@section('content')
<div class="container">
    <div class="card">
        <h3>Login</h3>
        <form action="/login" method="POST" style="padding-top: 40px">
            @if ($errors->any())
                <div class="panel-danger">
                    @foreach ($errors->all() as $error)
                        {{$error}}
                    @endforeach
                </div>
            @endif
            @csrf
                <label>
                    Email: 
                    <input type="email" name="email" id="email" placeholder="test@address.com">
                </label>
            <label>
                Password: 
                <input type="password" name="password" id="password" placeholder="•••••••">
            </label>
            <button class="btn btn-primary">Login</button>
        </form>        
    </div>
</div>
@endsection
