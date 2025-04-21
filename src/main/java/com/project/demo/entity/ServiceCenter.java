package com.project.demo.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;


/**
 * 服务中心：(ServiceCenter)表实体类
 *
 */
@TableName("`service_center`")
@Data
@EqualsAndHashCode(callSuper = false)
public class ServiceCenter implements Serializable {

    // ServiceCenter编号
    @TableId(value = "service_center_id", type = IdType.AUTO)
    private Integer service_center_id;

    // 项目名称
    @TableField(value = "`entry_name`")
    private String entry_name;
    // 项目类型
    @TableField(value = "`project_type`")
    private String project_type;
    // 封面图片
    @TableField(value = "`cover_photo`")
    private String cover_photo;
    // 服务时间
    @TableField(value = "`service_time`")
    private String service_time;
    // 发布日期
    @TableField(value = "`release_date`")
    private Timestamp release_date;
    // 项目详情
    @TableField(value = "`project_details`")
    private String project_details;

    // 点击数
    @TableField(value = "hits")
    private Integer hits;

    // 点赞数
    @TableField(value = "praise_len")
    private Integer praise_len;








    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
