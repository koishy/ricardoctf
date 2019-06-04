@extends('quizzes.dashboard_generic')

@section('navigation')
    <div class="flex free">
      <div class="card">
        <a href="/dashboard" style="color: teal;">Your quizzes</a>
      </div>
      <div class="card">Others quizzes</div>
    </div>
@endsection

@section('quizzes')
    @foreach ($quizzes as $quiz)
    <div class="card">
        <div class="right" style="margin-top: -5px;">
            <a class="btn btn-success" href="/dashboard/{{$quiz->id}}/edit/">
                <i class="mdi mdi-pencil"></i>
            </a>
            <a href="/dashboard/{{$quiz->id}}/delete/" class="btn btn-danger"
                onclick="return confirm('Are you sure want to delete the quiz, this action is permament.')"
                style="margin-left: 15px;">
                <i class="mdi mdi-close"></i>
            </a>
        </div>
        <div class="left">
            <h2> <a href="/quizzes/{{$quiz->id}}" style="color: black;">{{$quiz->title}}</a></h2>


            <small style="padding-top: 20px; display: block;">
                Author: {{$quiz->belongsTo(\App\User::class, 'user_id')->first()->name}}
              </small>
        </div>
    </div>
    @endforeach
@endsection