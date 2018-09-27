<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Crypt;

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

    public function register(Request $request){

        $validatedData = $this->validate($request,[
            'email'     => 'required',
            'password'  => 'required'
        ]);
        $data = [
            'email'     => $request->email,
            'password'  => Crypt::encrypt($request->password)
        ];

        $success = DB::table('users')->insert(
            $data
        );

        $response = [
            'status' => 'success',
            'data'   => $data
        ];

        return response()->json($response,200);
    }

    public function info(Request $request){

        $response = [
            'status' => 'success',
            'data'   => $request->user()
        ];

        return response()->json($response,200);
    }

    public function update(Request $request){

        $response = [
            'status' => 'success',
            'data'   => $data
        ];

        return response()->json($response,200);
    }

    public function delete(Request $request){

        $response = [
            'status' => 'success',
            'data'   => $data
        ];

        return response()->json($response,200);
    }
}
