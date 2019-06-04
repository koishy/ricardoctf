@extends('layouts.app')

@section('content')
<div class="container">

</div>

<div id="root">
  <ctf-editor :quiz-id="{{$quiz->id}}" title="{{$quiz->title}}">
  </div>
<script src="/js/ctf-editor.js"></script>

@endsection
