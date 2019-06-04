@extends('layouts/app')

@section('content')
    <div id="root">
    <ctf-app :quiz-id="{{ $quiz->id }}" :is-author="{{\Auth::id() == $quiz->user_id ? 'true' : 'false'}}"></ctf-app>
    </div>
    <script src="/js/ctf.js"></script>
@endsection