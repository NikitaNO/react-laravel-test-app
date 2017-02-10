<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function register(Request $request)
    {
        $apiToken = str_random(32);

        try {
            $user = User::create([
                'first_name' => $request->input('first_name'),
                'surname' => $request->input('surname'),
                'age' => $request->input('age'),
                'password' => $request->input('password'),
                'api_token' => $apiToken
            ]);

            return response()->json([
                'success' => true,
                'user' => $user
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false
            ], 403);
        }
    }

    public function login(Request $request)
    {
        $user = User::where('first_name', $request->input('first_name'))
            ->where('password', $request->input('password'))
            ->first();

        if($user) {
            $apiToken = str_random(32);

            $user->api_token = $apiToken;
            $user->save();

            return response()->json([
                'api_token' => $apiToken
            ]);
        } else {
            return response(null, 403);
        }
    }

    public function updateUserData(Request $request)
    {
        $user = $request->user();

        $user->first_name = $request->input('first_name');
        $user->surname = $request->input('surname');
        $user->age = $request->input('age');

        $newPassword = $request->input('password');

        $user->password = $newPassword ? $newPassword : $user->password;

       try {
           $user->save();

           return response()->json([
               'success' => true
           ]);

       } catch (\Exception $e) {
           return response()->json([
               'success' => false
           ], 500);
       }
    }

}