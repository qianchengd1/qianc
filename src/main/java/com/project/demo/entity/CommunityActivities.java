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
 * 社区活动：(CommunityActivities)表实体类
 *
 */
@TableName("`community_activities`")
@Data
@EqualsAndHashCode(callSuper = false)
public class CommunityActivities implements Serializable {

    // CommunityActivities编号
    @TableId(value = "community_activities_id", type = IdType.AUTO)
    private Integer community_activities_id;

    // 活动编号
    @TableField(value = "`activity_number`")
    private String activity_number;
    // 活动名称
    @TableField(value = "`activity_name`")
    private String activity_name;
    // 活动类型
    @TableField(value = "`activity_type`")
    private String activity_type;
    // 封面图片
    @TableField(value = "`cover_photo`")
    private String cover_photo;
    // 活动时间
    @TableField(value = "`activity_time`")
    private String activity_time;
    // 活动地点
    @TableField(value = "`event_location`")
    private String event_location;
    // 发布人员
    @TableField(value = "`publishing_personnel`")
    private Integer publishing_personnel;
    // 用户姓名
    @TableField(value = "`user_name`")
    private String user_name;
    // 活动内容
    @TableField(value = "`activity_content`")
    private String activity_content;

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
