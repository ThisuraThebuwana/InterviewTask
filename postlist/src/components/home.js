import React, {Component} from 'react';
import axios from "axios";

class Home extends Component {

    dataArr;
    state = {
        postList: null
    };

    constructor(props){
        super(props);

        this.getPostList();
    }

    getPostList = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res=>{
                this.dataArr = res.data;
            })
            .then(()=>{
                this.setState({
                    postList: this.dataArr.slice(0, 5)
                })
            })
            .catch(err=>{
                console.log(err)
            });
    };

    moveDown = (index) => {

        console.log("index:"+index);
        let newArr = this.state.postList;
        let temp = newArr[index];

        newArr[index] = newArr[index+1];
        newArr[index+1] = temp;

        console.log("new Array : "+ newArr)
        this.setState({
            postList: newArr
        })
    };

    moveUp = (index) => {

        let newArr = this.state.postList;
        let temp = newArr[index];

        newArr[index] = newArr[index-1];
        newArr[index-1] = temp;

        console.log("new Array : "+ newArr)
        this.setState({
            postList: newArr
        })
    };

    render() {
        return (
            <div className="bg-hero-pattern bg-no-repeat bg-cover">
                <div className="flex flex-row ...">
                    <div className="flex-1 ...">
                        {(this.state.postList!=null)?this.state.postList.map((post,i) => (
                            <div className="box-border  p-4 border-4 m-10 ..." key={post.id}>
                                <div className="grid grid-cols-6 gap-4 items-center">
                                    <div className="col-span-5 ...">
                                        <p className="font-extrabold">{post.title}</p>
                                        <p className="font-normal">{post.body}</p>
                                    </div>
                                    {(i==0)?
                                        <div className="col-span-1 ...">
                                            <button
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                                                onClick={()=>this.moveDown(i)}
                                            >
                                                down
                                            </button>
                                        </div>
                                        :((i==this.state.postList.length-1)?
                                                <div className="col-span-1 ...">
                                                    <button
                                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                                                        onClick={()=>this.moveUp(i)}
                                                    >
                                                        up
                                                    </button>
                                                </div>
                                                :
                                                <div className="col-span-1 ...">
                                                    <button
                                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                                                        onClick={()=>this.moveUp(i)}
                                                    >
                                                        up
                                                    </button>
                                                    <button
                                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                                                        onClick={()=>this.moveDown(i)}
                                                    >
                                                        down
                                                    </button>
                                                </div>

                                        )
                                    }

                                </div>

                            </div>
                        )):null}
                    </div>
                    <div className="flex-1 ...">right</div>
                </div>
            </div>
        );
    }
}

export default Home;
