/**
 * 该模块的作用，是本地的商品信息进行增删改查
 */

const KEY = "GOODS"

/**
 * 获取本地商品的`对象`
 * 
 * "{"87":4,"88":2}" ===> {"87":4,"88":2}
 * 
 * '{}' ===> {}
 */
const getLocalGoods = () => {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}

/**
 * 获取目前最新的本地的总数
 */
const getTotalCount = () => {
    //1.获取本地对象 {"87":4,"88":2}
    const localGoods = getLocalGoods()
    let totalCount = 0
    
    for(const key in localGoods){
        totalCount+=localGoods[key]
    }

    return totalCount
}

/**
 * 把商品保存到本地的localStorage
 * @param {*} goods {goodsId:87,count:2}
 */
const addLocalGoods = goods => {
    //1.获取本地对象
    // localGoods ===> {"87":4,"88":2}
    const localGoods = getLocalGoods()

    console.log(localGoods)

    //2.判断传递过来的goods中的goodsId是否在localGoods中
    //如果存在数量就累加，如果不存在新增
    if(localGoods[goods.goodsId]){ //传递过来的商品的id在本地之前已经有了
        localGoods[goods.goodsId] += goods.count
    }else{
        localGoods[goods.goodsId] = goods.count
    }

    console.log(localGoods)

    //3.保存回去
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //4.统计最新的数量，返回
    return getTotalCount()
}

/**
 * 把商品保存到本地的localStorage
 * @param {*} goods {goodsId:87,count:3}
 */
const updateLocalGoods = goods => {
    //1.获取本地对象
    // localGoods ===> {"87":4,"88":2}
    const localGoods = getLocalGoods()

    // 更改数量
    localGoods[goods.goodsId] = goods.count

    //3.保存回去
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //4.统计最新的数量，返回
    return getTotalCount()
}

/**
 * 根据goodsId删除商品
 * @param {*} goodsId 商品的id
 */
const deleteLocalGoods = goodsId => {
    //1.获取本地对象
    // localGoods ===> {"87":4,"88":2}
    const localGoods = getLocalGoods()

    //2.删除
    delete localGoods[goodsId]

    //3.保存回去
    localStorage.setItem(KEY,JSON.stringify(localGoods))

    //4.统计最新的数量，返回
    return getTotalCount()
}

// 按需导出
export {addLocalGoods,getTotalCount,getLocalGoods,updateLocalGoods,deleteLocalGoods}