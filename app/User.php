<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    function rank()
    {
        $taskChecks = $this->hasMany(\App\TaskCheck::class);

        $total = $taskChecks->count();
        $sum = $taskChecks->where('completed', true)->count();
        return $sum - ($total - $sum);
    }

    function rankHtml()
    {
        $rank = $this->rank();

        if ($rank < 0)
        {
            return '<span style="color: crimson">'.$rank.'</span>';
        }
        else if ($rank > 0)
        {
            return '<span style="color: green">'.$rank.'</span>';
        }
        else 
        {
            return $rank;
        }
    }
}
