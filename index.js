var vue=new Vue( {
    el:"#app",
    data:{
      searchName:"",
      bcheckList:[{text:'html',value:'html'},{text:'js',value:'js'},{text:'css',value:'css'}],
      bchecked:['html'],
      toggle:false,
      value1:'a',
      value2:'b',
      picked1:false,
      picked:true,
      value:123,
      selected:"",
      list:[],
      columns:['名称','价格','数量','操作'],
      form:{ 
         name:11,
         price:0,
         number:0,
         selected:'1',
         options:[{value:0,text:'手机'},{value:1,text:'水果'}]
      },
    },
    mounted:function(){
       //挂载获取数据
        this.list=ajaxGetData();
    },
    methods:{
        handleAdd:function(index,indexs){ 
            this.list[index][indexs].count++;
        },
        handleReduce:function(index,indexs){ 
            if(this.list[index][indexs].count==1){ 
                return;
            }
            this.list[index][indexs].count--;
        },
        handleRmove:function(index,indexs){ 
            this.list[index].splice(indexs,1); 
        },
        addProduct:function(){
            var index= this.form.selected;
            this.list[index].push({
                id:this.list[index].lenght+1,
                name:this.form.options[index].text+new Date().getSeconds(),
                price:1999,
                count:1
            })
        },
        checkAll:function(event){
            var target = event.currentTarget;
            for (var index = 0;index < this.list.length;index++) {
                for (var indexs = 0; indexs <  this.list[index].length; indexs++) { 
                    this.list[index][indexs].checked=target.checked;
                }
            }
        },
        checkedChild:function(index){
            console.log( this.list[index][0].checked);
            for (let indexs = 1; indexs < this.list[index].length; indexs++) {
                this.list[index][indexs].checked =  !this.list[index][0].checked;
            } 
        },
        clearCart:function(){
            this.list.splice(0);  
        },
        search:function(){ 
            return this.list.filter(function(product)   {  
                return product.name.match(/this.searchName/)
           })
        }
    },
    computed:{
        totalprice:function(){
            var sumPrice=0; 
            for (var index = 0; index < this.list.length; index++) {
                 
                for(var indexs=1;indexs< this.list[index].length;indexs++){ 
                    if(this.list[index][indexs].checked){
                        sumPrice+=this.list[index][indexs]['price']*this.list[index][indexs].count; 
                    }
                }
            } 
            return sumPrice;
        }
    }
})

function ajaxGetData(){
    return [ 
            [
                {
                type:'手机',checked:false
                },
            { 
                name:'苹果手机',
                price:6888,
                count:1,
                checked:0
            },
            { 
                name:'华为手机',
                price:5888,
                count:1,
                checked:0
            },
            { 
                name:'三星手机',
                price:4888,
                count:1,
                checked:0
            }
            ],
            [
                {type:"水果",checked:false},
            { 
                name:'苹果',
                price:6, 
                count:1,
                checked:0
            },
            {
                id:2,
                name:'梨子',
                price:3, 
                count:1,
                checked:0
            },
            {
                id:3,
                name:'香蕉',
                price:4, 
                count:1,
                checked:0
            },
            {
                id:3,
                name:'栗子',
                price:8, 
                count:1,
                checked:0
            }
            ]
    ];
}