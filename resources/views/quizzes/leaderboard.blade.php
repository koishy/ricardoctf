@extends('layouts.app')

@section('content')
<div class="container">
  <div class="card">
    <table style="width: 100%;">
      <thead>
        <th>Name</th>
        <th>Rank</th>

      </thead>
      <tbody>
        @php($key = 0)
        @foreach($users as $user)
          <tr>
            <td>
              @if ($key == 0)
                <i class="mdi mdi-crown" style="color: gold;"></i>
              @endif
              @if ($key == 1)
                <i class="mdi mdi-crown" style="color: silver;"></i>
              @endif
              @if ($key == 2)
                <i class="mdi mdi-crown" style="color: brown;"></i>
              @endif
              {{ $user->name }}
            </td>
            <td>
              {!! $user->rankHtml() !!}
            </td>
          </tr>
          @php($key++)
        @endforeach
      </tbody>
    </table>
  </div>
</div>

@endsection
