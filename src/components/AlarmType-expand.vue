<template>
  <div>
    <Row type="flex" justify="start" class="expand-row">
        <Col span="12">
            <span >地址: </span>
            <span >{{ row.deviceCode }}</span>
        </Col>
        <Col span="12">
            <span >设备类型: </span>
            <span >{{ row.deviceTypeName }}</span>
        </Col>
    </Row>
    <Row type="flex" justify="start" class="expand-row">
        <Col span="12">
            <span >处置时间: </span>
            <span >{{ row.processTimeToDate }} {{ row.processTimeToTime }}</span>
        </Col>
        <Col span="12">
            <span >处置人: </span>
            <span >{{ row.processName }}</span>
        </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
            row: Object
        }
};
</script>

<style scoped>
.expand-row{
        margin-bottom: 10px;
    }
</style>
