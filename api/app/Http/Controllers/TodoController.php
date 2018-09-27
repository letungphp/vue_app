<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class TodoController extends Controller
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

    //List all todo
    public function todo(){

        $data = DB::table('todos')->get();

        return response()->json($data,200);
    }

    //Create new todo
    public function addTodo(Request $request){

        $validatedData = $this->validate($request,[
            'title'         => 'required',
            'description'   => 'required'
        ]);

        $data = [
            'title'         => $request->title,
            'description'   => $request->description,
            'status'        => 0,
            'created_at'    => date('Y-m-d H:i:s'),
            'updated_at'    => date('Y-m-d H:i:s')
        ];

        $id = DB::table('todos')->insertGetId($data);

        if(!$id){
            return response()->json(['status'=>'error','msg'=>'Insert fail !'],500);
        }

        $data['id'] = $id;

        return response()->json($data,200);
    }

    //Update to do
    public function updateTodo(Request $request){
        $validatedData = $this->validate($request,[
            'title'         => 'required',
            'description'   => 'required',
            'status'        => 'required',
            'id'            => 'required'
        ]);

        $data = [
            'title'         => $request->title,
            'description'   => $request->description,
            'status'        => $request->status,
            'updated_at'    => date('Y-m-d H:i:s')
        ];

        $result = DB::table('todos')->where('id',$request->id)->update($data);

        if(!$result){
            return response()->json(['status'=>'error','msg'=>'Update fail !'],500);
        }

        return response()->json($data,200);
    }

    //Delete todo
    public function deleteTodo(Request $request,$id){

        $result = DB::table('todos')->where('id',$id)->delete();

        if(!$result){
            return response()->json(['status'=>'error','msg'=>'Delete fail !'],500);
        }

        return response()->json(['status'=>'success'],200);
    }
}
