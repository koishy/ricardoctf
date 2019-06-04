@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="flex free">
                    <a class="btn btn-primary" href="/quizzes" >Quizzes</a>
                    <a class="btn btn-success" href="/leaderboard" >Leaderboard</a>
                    <a class="btn btn-danger" href="/dashboard" >Dashboard</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
