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

    public function login(Request $request){

        $validatedData = $this->validate($request,[
            'email'     => 'required',
            'password'  => 'required'
        ]);
        

        $data = DB::table('users')->where([
            'email'     => $request->email
        ])->first();

        if(!$data){
            $response = [
                'status' => 'error',
                'message'=> 'Login failed',
                'data'   => []
            ];
            return response()->json($response,200);
        }

        if(Crypt::decrypt($data->password) != $request->password ){
            $response = [
                'status' => 'error',
                'message'=> 'Invalid password',
                'data'   => []
            ];
            return response()->json($response,200);
        }

        $data->token = $data->password;

        $response = [
            'status' => 'success',
            'message'=> '',
            'data'   => $data
        ];

        return response()->json($response,200);
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
