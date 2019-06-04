@extends('layouts.app')

@section('content')
<div class="container">
  <div class="card">
      @if ($errors->any())
      <div class="panel-danger">
          @foreach ($errors->all() as $error)
              {{$error}}
          @endforeach
      </div>
  @endif
    <form action="/dashboard/create" method="POST">
      @csrf
      <div class="flex free">
        <input type="text" name="title" required placeholder="Quiz title" value="{{old('title')}}">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</div>
@endsection
