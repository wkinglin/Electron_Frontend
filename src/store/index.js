import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  state () {
    return {
      count: 0,
      row:0,
      tableData:[],
      newTableValible:true,
      algId:0,
      aloId:0,
      isCollapsed:true,
      recId:0,
      aloValue:{},
      rectValue:{},
      isTurnAlo:false,
      sysAndProId:{},
    }
  },
  mutations: {
    increment (state) {
      state.count++;
      state.tableData.push({
        name:"表格"+state.count,
        valid:true,
        headers:[],
        headersType:[],
        colnum:0,
        rownum:0,
      });
    },
    decrement (state) {
      if(state.count>0){
        state.count--;
        state.tableData.pop();
      } 
    },
    changeTableData(state,payload){
      state.tableData[payload.row-1].headers[payload.i]=payload.element;
      state.tableData[payload.row-1].colnum=payload.colnum;
      state.tableData[payload.row-1].rownum=payload.rownum;
    },
    changeTableType(state,payload){
      state.tableData[payload.row-1].headersType[payload.i]=payload.element;
    },
    changeTableName(state,payload){
      state.tableData[payload.i].name=payload.name;
    },
    changeTableValid(state,payload){
      state.tableData[payload.i].valid=payload.valid;
    },
    deleteTableData(state,payload){
      state.tableData.splice(payload.i,1);
    },
    deleteTableHeader(state,payload){
      state.tableData[payload.i].headers.pop();
      // state.tableData[payload.i].headersType.pop();
    },
    addTableHeader(state,payload){
      state.tableData[payload.i].headers.push("");
    },
    changeCollapsed(state,bool){
      state.isCollapsed =bool;
    },
    changeAloValue(state,aloValue){
      state.aloValue =aloValue;
    },
    changeRectValue(state,rectValue){
      state.rectValue = rectValue;
    },
    changeSysAndProId(state,Value){
      state.sysAndProId = Value;
    },
  },
})
