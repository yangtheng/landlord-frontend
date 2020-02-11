const cards = {
    3: {
        value: 1
    },
    4: {
        value: 2
    },
    5: {
        value: 3
    },
    6: {
        value: 4
    },
    7: {
        value: 5
    },
    8: {
        value: 6
    },
    9: {
        value: 7
    },
    'T': {
        value: 8
    },
    'J': {
        value: 9
    },
    'Q': {
        value: 10
    },
    'K': {
        value: 11
    },
    'A': {
        value: 12
    },
    2: {
        straight: false,
        value: 13
    },
    'Jokerblack': {
        straight: false,
        value: 14
    },
    'Jokerred': {
        straight: false,
        value: 15
    }
}

const isJokerBomb = (nums) => {
    if (!nums) return false;
    if(nums.length === 2 && nums.reduce((acc,cur) => {
        return acc + cur.value;
    },0) === 29) return true;
    return false;
}

const isStraight = (nums) => {
    if (!nums) return false;
    if (nums.length === 1) return true;
    // sort first
    const sortedNums = nums.sort((a, b) => {
        return a.value - b.value;
    });

    for (let index = 0; index < sortedNums.length; index++) {
        const num = sortedNums[index];
        if (typeof (num.straight) != undefined && num.straight === false){
          return false;
        }
        else if (index !== sortedNums.length - 1 && (sortedNums[index + 1].value - num.value !== 1)) {
            return false;
        }
    }
    return true;
}

const group = (nums) => {
    const counts = nums.reduce(function (acc, cur) {
        (acc[cur.value] = acc[cur.value] || { ...cur, count: 0 }).count += 1;
        return acc;
    }, {});
    const groupByCount = {};
    for (const key of Object.keys(counts)) {
        (groupByCount[counts[key].count] = groupByCount[counts[key].count] || []).push(counts[key]);
    }
    return groupByCount;
}

const getFormat = (input = []) => {
    const nums = input.map(v => cards[`${v.type}${v.suit}`] || cards[v.type]);
    const groups = group(nums);
    let flag = true;
    let bombs = 0;
    const countsGroups = Object.keys(groups);
    // should at most have 2 card patterns only
    if (countsGroups.length > 2) {
        flag = false;
    }

    const maxGroup = Math.max(...countsGroups);
    const anotherGroup = Math.min(...countsGroups);
    if (countsGroups.length === 1) {
        if(isJokerBomb(groups[maxGroup])){
            bombs = 1;
        }else if(!isStraight(groups[maxGroup])){
            // must be straight
            flag = false;
        }else if( (maxGroup === 2 && groups[maxGroup].length === 2) || (maxGroup === 1 && groups[maxGroup].length <5 && groups[maxGroup].length !== 1)){
            // cannot be 2 paris
            // cannot be straight that less than 5 cards
            flag = false;
        }
        if(maxGroup == 4) bombs = groups[maxGroup].length;
    } else {
      // console.log(anotherGroup);
      // console.log(groups[anotherGroup], groups[maxGroup]);
      // console.log(Math.floor(maxGroup/4) + 1);
      // console.log("======");
      // console.log(groups[anotherGroup].length);
      // console.log(groups[maxGroup].length);
      // console.log(groups[maxGroup].length * Math.floor(maxGroup/4) + 1);
      // console.log(![groups[anotherGroup].length].includes(groups[maxGroup].length * Math.floor(maxGroup/4) + 1));
        if (!isStraight(groups[maxGroup]) || ![3, 4].includes(maxGroup)) {
            flag = false;
        } else if (!(anotherGroup <= 2 && [groups[anotherGroup].length,anotherGroup ===2 ? groups[anotherGroup].length*2 : -1].includes(groups[maxGroup].length * (Math.floor(maxGroup/4) + 1)))) {
            flag = false;
        }
    }

    const maxCard = groups[maxGroup] ? groups[maxGroup].reduce((acc, cur) => {
        if (cur.value > acc) return cur.value;
        return acc;
    }, 0) : 0;

    return {
        valid: flag,
        format: groups,
        maxCard,
        bombs
    };
}

const beat = (oldCards, newCards) => {
    const {format: newFormat, bombs,valid,maxCard} = getFormat(newCards);
    if(!valid){
        return false;
    }
    if (!oldCards.length && valid){
      return {
        bombs
      }
    }
    const {format: oldFormat, maxCard: oldMaxCard, bombs: oldBombs } = getFormat(oldCards);
    if(bombs === 0){
        if(Object.keys(newFormat).length !== Object.keys(oldFormat).length) return false;
        for(const key of Object.keys(newFormat)){
            if(!oldFormat[key] || oldFormat[key].length != newFormat[key].length) return false;
        }
    }
    // console.log(maxCard, oldMaxCard);
    if(maxCard <= oldMaxCard && oldBombs === bombs) return false;
    return {
        bombs
    }
}

// console.log(beat(
// [
//   {
//     type: '2',
//     suit: 'black'
//   },
// ],
// [
  // {
  //   type: 'A',
  //   suit: 'black'
  // },
  // {
  //   type: 'Q',
  //   suit: 'black'
  // },
  // {
  //   type: 'Q',
  //   suit: 'black'
  // },
  // {
  //   type: 'J',
  //   suit: 'black'
  // },
  // {
  //   type: 'J',
  //   suit: 'black'
  // },
//   {
//     type: '8',
//     suit: 'black'
//   },
//   {
//     type: '8',
//     suit: 'black'
//   },
//   {
//     type: '8',
//     suit: 'black'
//   },
//   {
//     type: '8',
//     suit: 'black'
//   },
// ]));
