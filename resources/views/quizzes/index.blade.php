@extends('layouts.app')

@section('content')
  <div class="container">
    @foreach ($quizzes as $quiz)
      <div class="card">
        <h2>{{$quiz->title}}</h2>
        <a class="btn btn-primary" style="display:inline-block; margin-top: 10px;" href="/quizzes/{{$quiz->id}}">Continue</a>
        <div style="float:right;">
                <small style="padding-top: 20px; display: block;">
                    Author: {{$quiz->belongsTo(\App\User::class, 'user_id')->first()->name}}
                  </small>
                </div>
      </div>
    @endforeach

  </div>
@endsection
