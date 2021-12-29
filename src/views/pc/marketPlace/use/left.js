import {
    reactive,
    onMounted,
    toRefs,
    onBeforeUnmount,
    inject,
    getCurrentInstance,
    toRaw,
    ref,
    nextTick,
    computed,
} from "vue";
import markrtPlaceHandle from "../use/dragonList.js";
import common from "@/utils/common";

const leftState = reactive({
    attackArr: [40, 88],
    defenseArr: [40, 88],
    healthArr: [40, 88],
    intelligenceArr: [40, 88],
    speedArr: [40, 88],
    breedCountArr: [0, 7],
    num: 1,
    filterSelectItem: 1,
    maxheight: 0,
    params: {
        classID: [], //属性
        stageType: [], //阶段
        saleType: [], //出售方式
        boneClassID: [], //龙骨属性
        boneSaleType: [], //龙骨出售方式
        leave: [], //龙哥等级
        // breedArr: [], //繁殖次数
    },
    showDragon: true,
    classList: [{
            id: 2,
            icon: require("@/assets/imgs/marketplace/class/class-icon1.png"),
            text: "Fire",
        },
        {
            id: 4,
            icon: require("@/assets/imgs/marketplace/class/class-icon2.png"),
            text: "Storm",
        },
        {
            id: 5,
            icon: require("@/assets/imgs/marketplace/class/class-icon3.png"),
            text: "Thunder",
        },
        {
            id: 1,
            icon: require("@/assets/imgs/marketplace/class/class-icon4.png"),
            text: "Water",
        },
        {
            id: 3,
            icon: require("@/assets/imgs/marketplace/class/class-icon5.png"),
            text: "Rock",
        },
    ],
    ceList: [{
            id: 2,
            icon: require("@/assets/imgs/marketplace/class/class-icon1.png"),
            text: "26702-31702",
        },
        {
            id: 2,
            icon: require("@/assets/imgs/marketplace/class/class-icon1.png"),
            text: "31072-36702",
        },
        {
            id: 2,
            icon: require("@/assets/imgs/marketplace/class/class-icon1.png"),
            text: "36702-41702",
        },
        {
            id: 2,
            icon: require("@/assets/imgs/marketplace/class/class-icon1.png"),
            text: "41702-49008",
        },
    ],
    leaveList: [{
            id: 3,
            text: "High",
        },
        {
            id: 2,
            text: "Medium",
        },
        {
            id: 1,
            text: "Low",
        },
    ],
    stageList: [{
            id: 1,
            text: "Egg",
        },
        {
            id: 2,
            text: "Adult",
        },
    ],
    saleList: [{
            id: 1,
            text: "Fixed price",
        },
        {
            id: 2,
            text: "Auction",
        },
    ],
    breedValue: [0, 7],
    ceValue: [0, 0],
    purenessValue: 3,
    purenessMarks: {
        0: "any",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
    },
    searchValue: "",
    selectList: [],
    searchResult: [],
    searchList: [{
            icon: require("@/assets/imgs/marketplace/parts/wing.png"),
            partName: "Wing",
            dnaNameEn: "Fire Dragon",
            prefab: "Wind_eye01",
            id: 0,
            index: 0,
            partId: 1,
            dna: 1111,
        },
        {
            icon: require("@/assets/imgs/marketplace/parts/eye.png"),
            partName: "Eye",
            dnaNameEn: "Fire Dragon",
            prefab: "Wind_eye01",
            id: 1,
            index: 1,
            partId: 1,
            dna: 1112,
        },
        {
            icon: require("@/assets/imgs/marketplace/parts/horn.png"),
            partName: "Horn",
            dnaNameEn: "Fire Dragon",
            prefab: "Wind_eye01",
            id: 2,
            index: 2,
            partId: 1,
            dna: 1113,
        },
        {
            icon: require("@/assets/imgs/marketplace/parts/ear.png"),
            partName: "Ear",
            dnaNameEn: "Water Dragon",
            prefab: "Wind_eye01",
            id: 3,
            index: 3,
            partId: 1,
            dna: 1114,
        },
        {
            icon: require("@/assets/imgs/marketplace/parts/totems.png"),
            partName: "Totem",
            dnaNameEn: "Storm Dragon",
            prefab: "Wind_eye01",
            id: 4,
            index: 4,
            partId: 1,
            dna: 1115,
        },
        {
            icon: require("@/assets/imgs/marketplace/parts/tail.png"),
            partName: "Tail",
            dnaNameEn: "Storm Dragon",
            prefab: "Wind_eye01",
            id: 5,
            index: 5,
            partId: 1,
            dna: 1116,
        },
        {
            icon: require("@/assets/imgs/marketplace/parts/tail2.png"),
            partName: "Tail",
            dnaNameEn: "Water Dragon",
            prefab: "Wind_eye01",
            id: 6,
            index: 6,
            partId: 1,
            dna: 1117,
        },
    ],

    attackSlider: {
        title: "ATTACK",
        list: [40, 80],
    },
    sliderValueSet: [10, 40],
    hasSearchResult: false,
});

export default function LeftHandle() {
    const API = inject("API");
    const getAdvise = () => {
        API.marketPlace
            .partSearchRecommend()
            .then((res) => {
                if (res && res.msg == "OK") {
                    let i = 0;
                    res.data.forEach((item) => {
                        item.index = i++;
                    });
                    console.log(res.data, "res.data");
                    leftState.searchList = res.data;
                }
            })
            .catch((err) => {});
    };
    const filterNum = computed(() => {
        if (marketPlaceState.menuItem == 1) {
            return (
                marketPlaceState.searchKey.clazz.length +
                marketPlaceState.searchKey.stage.length +
                marketPlaceState.searchKey.saleType.length +
                (marketPlaceState.searchKey.dna.length > 0 ? 1 : 0) +
                (JSON.stringify(marketPlaceState.searchKey.attackArr) ==
                    JSON.stringify([40, 88]) ?
                    0 :
                    1) +
                (JSON.stringify(marketPlaceState.searchKey.defenseArr) ==
                    JSON.stringify([40, 88]) ?
                    0 :
                    1) +
                (JSON.stringify(marketPlaceState.searchKey.healthArr) ==
                    JSON.stringify([40, 88]) ?
                    0 :
                    1) +
                (JSON.stringify(marketPlaceState.searchKey.speedArr) ==
                    JSON.stringify([40, 88]) ?
                    0 :
                    1) +
                (JSON.stringify(marketPlaceState.searchKey.intelligenceArr) ==
                    JSON.stringify([40, 88]) ?
                    0 :
                    1) +
                (JSON.stringify(marketPlaceState.searchKey.breedCountArr) ==
                    JSON.stringify([0, 7]) ?
                    0 :
                    1) +
                (JSON.stringify(marketPlaceState.searchKey.ceArr) ==
                    JSON.stringify([26702, 49008]) ?
                    0 :
                    1)
            );
        } else {
            return (
                leftState.params.boneClassID.length +
                leftState.params.boneSaleType.length +
                leftState.params.leave.length
            );
        }
    });
    const { marketPlaceState, initSearch } = markrtPlaceHandle();
    const selectFilterItem = (e) => {
        leftState.filterSelectItem = e;
    };
    //slide
    const onChangeSlide = (data, name) => {
        marketPlaceState.searchKey[name] = data;
        console.log(marketPlaceState.searchKey, "marketPlaceState.searchKey");
        initSearch();
    };
    const handleReset = (name) => {
        marketPlaceState.searchKey[name] = [40, 88];
        leftState[name] = [40, 88];
        initSearch();
    };
    const selectClass = (e) => {
        e.selected = !e.selected;
        if (marketPlaceState.menuItem == 1) {
            if (e.selected) {
                leftState.params.classID.push(e.id);
            } else {
                const index = leftState.params.classID.findIndex(
                    (item) => item == e.id
                );
                leftState.params.classID.splice(index, 1);
            }
            marketPlaceState.searchKey.clazz = leftState.params.classID;
        } else {
            if (e.selected) {
                leftState.params.boneClassID.push(e.id);
            } else {
                const index = leftState.params.boneClassID.findIndex(
                    (item) => item == e.id
                );
                leftState.params.boneClassID.splice(index, 1);
            }
            marketPlaceState.searchKey.clazz = leftState.params.boneClassID;
        }
        initSearch();
    };
    const searchSelect = (item) => {
        const index = leftState.searchList.findIndex((i) => item.dna === i.dna);
        const hasData = leftState.selectList.some((i) => i.dna === item.dna);
        if (!hasData) {
            // leftState.searchList.splice(index, 1);
            leftState.selectList.push(item);
            marketPlaceState.searchKey.dna.push(item);
        }
        initSearch();
    };
    const changeTab = () => {
        clearFilter();
    };
    const popupSelect = (item) => {
        const has = leftState.selectList.some((i) => i.dna === item.dna);
        if (!has) {
            leftState.selectList.push(item);
            marketPlaceState.searchKey.dna.push(item);
        }
        leftState.hasSearchResult = false;
        initSearch();
    };
    //TODO

    const handleSearch = (event) => {
        //TODO 请求搜索接口

        if (leftState.searchValue) {
            const params = {
                search: common.trimRightAndLeft(leftState.searchValue),
            };
            API.marketPlace
                .partSearch(params)
                .then((res) => {
                    if (res) {
                        leftState.searchResult = res.data;
                        leftState.hasSearchResult = res.data.length ? true : false;
                    }
                })
                .catch((err) => {});
        } else {
            leftState.searchResult = [];
            leftState.hasSearchResult = false;
        }
    };

    const claerSelect = (item, arrIndex) => {
        const index = leftState.selectList.findIndex((i) => item.dna === i.dna);
        leftState.selectList.splice(index, 1);
        marketPlaceState.searchKey.dna.splice(arrIndex, 1);
        initSearch();
    };

    const initData = () => {
        marketPlaceState.searchKey.stage = [];
        marketPlaceState.searchKey.saleType = [];
        marketPlaceState.searchKey.clazz = [];
        marketPlaceState.searchKey.parts = [];
        marketPlaceState.searchKey.attackArr = [40, 88];
        marketPlaceState.searchKey.dna = [];
        marketPlaceState.searchKey.defenseArr = [40, 88];
        marketPlaceState.searchKey.healthArr = [40, 88];
        marketPlaceState.searchKey.speedArr = [40, 88];
        marketPlaceState.searchKey.intelligenceArr = [40, 88];
        marketPlaceState.searchKey.breedCountArr = [0, 7];
        marketPlaceState.searchKey.ceArr = [26702, 49008];
        // marketPlaceState.searchKey.boneClassID = [];
        marketPlaceState.searchKey.levelArr = [];
        //  marketPlaceState.searchKey.boneSaleType = [];
        initSearch();
    };

    const clearFilter = () => {
        leftState.classList.forEach((item) => {
            item.selected = false;
        });

        leftState.saleList.forEach((item) => {
            item.selected = false;
        });
        if (marketPlaceState.menuItem == 1) {
            leftState.stageList.forEach((item) => {
                item.selected = false;
            });
            leftState.params.classID = [];
            leftState.params.stageType = [];
            leftState.params.saleType = [];
            leftState.ceValue = [26702, 49008];
            leftState.selectList = [];
            leftState.sliderValueSet = [10, 40];
            leftState.searchValue = "";
            leftState.searchResult = [];
            leftState.hasSearchResult = false;
            leftState.attackArr = [40, 88];
            leftState.defenseArr = [40, 88];
            leftState.healthArr = [40, 88];
            leftState.intelligenceArr = [40, 88];
            leftState.speedArr = [40, 88];
            leftState.breedCountArr = [0, 7];
        } else {
            leftState.leaveList.forEach((item) => {
                item.selected = false;
            });
            leftState.params.boneClassID = [];
            leftState.params.boneSaleType = [];
            leftState.params.leave = [];
        }

        initData();
    };
    const sortArr = (x, y) => {
        if (x.index < y.index) {
            return -1;
        } else if (x.index > y.index) {
            return 1;
        } else {
            return 0;
        }
    };

    const selectStage = (e) => {
        e.selected = !e.selected;
        if (e.selected) {
            leftState.params.stageType.push(e.id);
        } else {
            const index = leftState.params.stageType.findIndex(
                (item) => item == e.id
            );
            leftState.params.stageType.splice(index, 1);
        }
        marketPlaceState.searchKey.stage = leftState.params.stageType;
        initSearch();
    };
    //TODO
    const selectLeave = (e) => {
        e.selected = !e.selected;
        if (e.selected) {
            leftState.params.leave.push(e.id);
        } else {
            const index = leftState.params.leave.findIndex((item) => item == e.id);
            leftState.params.leave.splice(index, 1);
        }
        marketPlaceState.searchKey.levelArr = leftState.params.leave;
        initSearch();
    };
    const selectSale = (e) => {
        e.selected = !e.selected;

        if (marketPlaceState.menuItem == 1) {
            if (e.selected) {
                leftState.params.saleType.push(e.id);
            } else {
                const index = leftState.params.saleType.findIndex(
                    (item) => item == e.id
                );
                leftState.params.saleType.splice(index, 1);
            }
            marketPlaceState.searchKey.saleType = leftState.params.saleType;
        } else {
            if (e.selected) {
                leftState.params.boneSaleType.push(e.id);
            } else {
                const index = leftState.params.boneSaleType.findIndex(
                    (item) => item == e.id
                );
                leftState.params.boneSaleType.splice(index, 1);
            }
            marketPlaceState.searchKey.saleType = leftState.params.boneSaleType;
        }

        // if (e.selected) {
        //   leftState.params.saleType.push(e.id);
        // } else {
        //   const index = leftState.params.saleType.findIndex((item) => item == e.id);
        //   leftState.params.saleType.splice(index, 1);
        // }
        // marketPlaceState.searchKey.saleType = leftState.params.saleType;
        initSearch();
    };

    const onChangeBreed = (e) => {
        marketPlaceState.searchKey.breedCountArr = e;
        initSearch();
    };
    const onChangeCe = (e) => {
        // leftState.params.ce = e;
        marketPlaceState.searchKey.ceArr = e;
        initSearch();
    };
    const testin = (event) => {
        leftState.searchResult = [];
        leftState.hasSearchResult = false;
    };

    return {
        leftState,
        marketPlaceState,
        getAdvise,
        selectFilterItem,
        selectClass,
        selectStage,
        onChangeBreed,
        onChangeCe,
        clearFilter,
        selectSale,
        filterNum,
        searchSelect,
        claerSelect,
        handleSearch,
        popupSelect,
        sortArr,
        onChangeSlide,
        handleReset,
        testin,
        selectLeave,
        changeTab,
    };
}