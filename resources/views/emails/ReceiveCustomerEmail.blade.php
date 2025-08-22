{{--@component('mail::message')--}}
{{--    {{$message}}--}}
{{--@endcomponent--}}
<div class="p-16">
    <p>Sender Name: {{$name}}</p>
    <p>Sender Email: {{$from}}</p>
    <br />
    <p>{{$message}}</p>
</div>
