// import axios from 'axios'

/*
fs.readFile('@/assets/sakaMembers.json', function(error, data) {
    if (error) {
        console.log(error);
        return;
    }

    var obj = JSON.parse(data);
    console.log(obj);
    }
});
*/

const state = {
  nogizaka46: {},
  hinatazaka46: {},
  sakurazaka46: {},
  memberGroups: [],
  groupMemberCount: 0,
  selectedTeam: '',
  selectedMember: {}
}

const getters = {
  getNogizaka46: state => { return state.nogizaka46 },
  getHinatazaka46: state => { return state.hinatazaka46 },
  getSakurazaka46: state => { return state.sakurazaka46 },
  getMembeGroups: state => { return state.memberGroups },
  getGroupMemberCount: state => { return state.groupMemberCount },
  getSelectedTeam: state => { return state.selectedTeam },
  getSelectedMember: state => { return state.selectedMember }
}

const actions = {
  async initialSakaMember ({ commit }, payload) {
    /*
    const response = await axios.get('http://localhost:5000/saka')
    response.data.payload = payload
    commit('setSakaMember', response.data)
    */
    commit('setSakaMember', payload)
  },
  setup ({ commit }, payload) {
    commit('setMemberGroups', payload)
  },
  setSelectedMember ({ commit }, name) {
    commit('updateSelectedMember', name)
  },
  setSelectedTeam ({ commit }, name) {
    commit('updateSelectedTeam', name)
  }
}

const mutations = {
  setSakaMember: (state, MemberData) => {
    /*
    console.log('setSakaMember')
    state.nogizaka46 = { ...MemberData.nogizaka46 }
    state.hinatazaka46 = { ...MemberData.hinatazaka46 }
    state.sakurazaka46 = { ...MemberData.sakurazaka46 }
    state.groupMemberCount = MemberData.payload.groupMemberCount
    state.selectedTeam = MemberData.payload.selectedTeam
    */
    state.groupMemberCount = MemberData.groupMemberCount
    state.selectedTeam = MemberData.selectedTeam
    state.memberGroups = [...generateMemberGroups(state)]
    state.selectedMember = state.memberGroups[0][0]
  },
  setMemberGroups: (state, payload) => {
    const isChangeTeam = state.selectedTeam !== payload.selectedTeam
    if (state.groupMemberCount !== payload.groupMemberCount || state.selectedTeam !== payload.selectedTeam) {
      state.groupMemberCount = payload.groupMemberCount
      state.selectedTeam = payload.selectedTeam
      state.memberGroups = [...generateMemberGroups(state)]
      if (isChangeTeam) {
        state.selectedMember = state.memberGroups[0][0]
      }
    }
    // console.log(state.memberGroups)
  },
  updateSelectedMember: (state, name) => {
    let isFind = false
    try {
      for (var i = 0; i < state.memberGroups.length; i++) {
        for (var j = 0; j < state.memberGroups[i].length; j++) {
          if (state.memberGroups[i][j].enName === name) {
            state.selectedMember = { ...state.memberGroups[i][j] }
            isFind = true
            break
          }
        }
      }
      if (!isFind) {
        throw new Error('got error in finding member data')
      }
    } catch (e) {
      console.log(e.message)
    }
  },
  updateSelectedTeam: (state, name) => {
    state.selectedTeam = name
  }
}

const generateMemberGroups = function (state) {
  if (!state) {
    return null
  }
  let memberData
  switch (state.selectedTeam) {
    case 'nogizaka46':
      memberData = [...state.nogizaka46.members]
      break
    case 'hinatazaka46':
      memberData = [...state.hinatazaka46.members]
      break
    case 'sakurazaka46':
      memberData = [...state.sakurazaka46.members]
      break
    default: {
      memberData = [...state.nogizaka46.members]
      break
    }
  }

  const groups = Math.ceil(memberData.length / state.groupMemberCount)
  const bufferGroups = []
  for (var i = 0; i < groups; i++) {
    const bufferGroup = []
    for (var j = 0; j < state.groupMemberCount; j++) {
      const index = i * state.groupMemberCount + j
      if (index >= memberData.length) {
        break
      }
      bufferGroup.push(memberData[index])
    }
    bufferGroups.push(bufferGroup)
  }

  // console.log(bufferGroups)
  return [...bufferGroups]
}

export default {
  state,
  getters,
  actions,
  mutations
}
