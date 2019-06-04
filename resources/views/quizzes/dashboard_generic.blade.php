@extends('layouts.app')

@section('content')
<div class="container">
    <style>
        .right {
            float: right;
            display: flex;
        }

        .add {
            text-align: center;
            font-size: 40px;
            line-height: .60;
            display: block;
            text-decoration: none;
            transition: .5s all;
        }

        .add:hover {
            background: rgba(0, 0, 0, 0.05);
        }

        

    </style>
    @yield('navigation')
    @yield('quizzes')
    <a class="card-placeholder add" href="/dashboard/create">
        +
    </a>
</div>
<script>
    function askForDeletion(e) {

    }

</script>
@endsection
