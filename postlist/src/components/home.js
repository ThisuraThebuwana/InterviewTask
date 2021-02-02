import React, {Component} from 'react';
import axios from "axios";

class Home extends Component {

    dataArr;
    state = {
        postList: null,
        actionList: [],
        actionid:-1
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

    movePost = (id,currentp,newp) => {

        let newArr = this.state.postList;
        let temp = newArr[currentp];

        newArr[currentp] = newArr[newp];
        newArr[newp] = temp;

        this.setState({
            postList: newArr
        });

    };

    moveDown = (id,index) => {

        this.movePost(id,index,index+1);

        this.addActions(id,index, index+1);

    };

    moveUp = (id,index) => {

        this.movePost(id,index,index-1);

        this.addActions(id,index, index-1);
    };

    addActions = (id, index, newindex) =>{

        const action = {
            actionid : this.state.actionid+1,
            id: id,
            before: index,
            now: newindex,
            display: true
        };
        this.setState({
            actionList: [...this.state.actionList, action],
            actionid : this.state.actionid+1
        });
    };

    timetravel = (actionid,id,currentp,lastp) => {
        this.movePost(id,currentp,lastp);

        let tempList = [...this.state.actionList];
        let tempobj = {...tempList[actionid]};
        tempobj.display = false;

        tempList[actionid] = tempobj;
        this.setState({
            actionList: tempList
        })


    };

    render() {
        return <div className="bg-hero-pattern bg-no-repeat bg-cover">
            <div className="flex flex-row ...">
                <div className="flex-1 ...">
                    {(this.state.postList != null) ? this.state.postList.map((post, i) => (
                        <div className="p-4 m-10 rounded bg-white shadow-xl ..." key={post.id}>
                            <div className="grid grid-cols-6 gap-4 items-center">
                                <div className="col-span-5 ...">
                                    <p className="font-extrabold">{post.title}</p>
                                    <p className="font-normal">{post.body}</p>
                                </div>
                                {(i === 0) ?
                                    <div className="col-span-1 ...">
                                        <button
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                                            onClick={() => this.moveDown(post.id,i)}
                                        >
                                            down
                                        </button>
                                    </div>
                                    : ((i === this.state.postList.length - 1) ?
                                            <div className="col-span-1 ...">
                                                <button
                                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                                                    onClick={() => this.moveUp(post.id,i)}
                                                >
                                                    up
                                                </button>
                                            </div>
                                            :
                                            <div className="col-span-1 ...">
                                                <button
                                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                                                    onClick={() => this.moveUp(post.id,i)}
                                                >
                                                    up
                                                </button>
                                                <button
                                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                                                    onClick={() => this.moveDown(post.id,i)}
                                                >
                                                    down
                                                </button>
                                            </div>

                                    )
                                }

                            </div>

                        </div>
                    )) : null}
                </div>
                <div className="flex-1 ...">
                    <div className="m-10 mb-0 bg-white rounded rounded-b-none shadow-xl ...">
                        List of actions comitted
                    </div>
                    <div className="m-10 pt-10 pb-10 mt-0 bg-gray-100 rounded rounded-t-none shadow-xl ...">
                        {this.state.actionList.map((data, index) => {
                            return (this.state.actionList[index].display)?<div className="ml-10 mr-10 p-6 bg-white  ...">
                                <div className="grid grid-cols-8 gap-4 items-center">
                                    <div className="col-span-6 ...">
                                        <p>Moved post {data.id} from index {data.before} to index {data.now}</p>
                                    </div>
                                    <div className="col-span-2 ...">
                                        <button
                                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4"
                                            onClick={() => this.timetravel(data.actionid,data.id,data.now,data.before)}
                                        >
                                            Time Travel
                                        </button>
                                    </div>
                                </div>
                            </div>:null
                        })}
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Home;
