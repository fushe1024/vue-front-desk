<script setup>
import Menu from '../../menu/index.vue'
import { ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'

defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 滑块样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '46px'
})

// 当前选中的索引 & 所有item 项
const currentIndex = ref(0)
const itemRefs = ref([])

// 添加所有item Dom 元素
const setItemRef = (el) => {
  if (el) itemRefs.value.push(el)
}

// listRef 元素
const listRef = ref(null)
// 通过 vueuse 获取获取响应式 scroll 距离
const { x } = useScroll(listRef)

// 监听 currentIndex 变化
watch(currentIndex, (val) => {
  // 获取当前 item 项的 left 和 width
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
  const { left, width } = itemRefs.value[val].getBoundingClientRect()

  // 更新滑块样式
  sliderStyle.value = {
    transform: `translateX(${x.value + left - 10}px)`,
    width: `${width}px`
  }
})

// 点击 item 项时触发
const handleClick = (index) => {
  currentIndex.value = index
  isPopup.value = false
}

// 更新前重置 itemRefs 数组
onBeforeUpdate(() => {
  itemRefs.value = []
})

// popup 是否显示
const isPopup = ref(false)
</script>

<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
      ref="listRef"
    >
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] z-20 h-4 px-1 flex items-center shadow-[-10px_0_10px_#fff] bg-white"
        @click="isPopup = true"
      >
        <svg-Icon class="w-1.5 h-1.5" iconClass="hamburger"></svg-Icon>
      </li>

      <!-- 滑块 -->
      <li
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200"
        :style="sliderStyle"
      ></li>

      <!-- itemx 项 -->
      <li
        v-for="(item, index) in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': currentIndex === index }"
        :ref="setItemRef"
        @click="handleClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>

    <!-- popup -->
    <popup v-model="isPopup">
      <Menu :categorydata="data" @onItemClick="handleClick" />
    </popup>
  </div>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
    <li>11</li>
    <li>12</li>
    <li>13</li>
    <li>14</li>
    <li>15</li>
    <li>16</li>
    <li>17</li>
    <li>18</li>
    <li>19</li>
    <li>20</li>
    <li>21</li>
    <li>22</li>
    <li>23</li>
    <li>24</li>
    <li>25</li>
    <li>26</li>
    <li>27</li>
    <li>28</li>
    <li>29</li>
    <li>30</li>
    <li>31</li>
    <li>32</li>
    <li>33</li>
    <li>34</li>
    <li>35</li>
    <li>36</li>
    <li>37</li>
    <li>38</li>
    <li>39</li>
    <li>40</li>
    <li>41</li>
    <li>42</li>
    <li>43</li>
    <li>44</li>
    <li>45</li>
    <li>46</li>
    <li>47</li>
    <li>48</li>
    <li>49</li>
    <li>50</li>
    <li>51</li>
    <li>52</li>
    <li>53</li>
    <li>54</li>
    <li>55</li>
    <li>56</li>
    <li>57</li>
    <li>58</li>
    <li>59</li>
    <li>60</li>
    <li>61</li>
    <li>62</li>
    <li>63</li>
    <li>64</li>
    <li>65</li>
    <li>66</li>
    <li>67</li>
    <li>68</li>
    <li>69</li>
    <li>70</li>
    <li>71</li>
    <li>72</li>
    <li>73</li>
    <li>74</li>
    <li>75</li>
    <li>76</li>
    <li>77</li>
    <li>78</li>
    <li>79</li>
    <li>80</li>
    <li>81</li>
    <li>82</li>
    <li>83</li>
    <li>84</li>
    <li>85</li>
    <li>86</li>
    <li>87</li>
    <li>88</li>
    <li>89</li>
    <li>90</li>
    <li>91</li>
    <li>92</li>
    <li>93</li>
    <li>94</li>
    <li>95</li>
    <li>96</li>
    <li>97</li>
    <li>98</li>
    <li>99</li>
    <li>100</li>
  </ul>
</template>

<style scoped></style>
