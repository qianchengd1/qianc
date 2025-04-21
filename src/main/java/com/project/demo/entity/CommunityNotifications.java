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
 * 社区通知：(CommunityNotifications)表实体类
 *
 */
@TableName("`community_notifications`")
@Data
@EqualsAndHashCode(callSuper = false)
public class CommunityNotifications implements Serializable {

    // CommunityNotifications编号
    @TableId(value = "community_notifications_id", type = IdType.AUTO)
    private Integer community_notifications_id;

    // 标题名称
    @TableField(value = "`title_name`")
    private String title_name;
    // 社区用户
    @TableField(value = "`community_users`")
    private Integer community_users;
    // 用户姓名
    @TableField(value = "`user_name`")
    private String user_name;
    // 发送日期
    @TableField(value = "`sending_date`")
    private Timestamp sending_date;
    // 通知内容
    @TableField(value = "`notification_content`")
    private String notification_content;










    // 更新时间
    @TableField(value = "update_time")
    private Timestamp update_time;

    // 创建时间
    @TableField(value = "create_time")
    private Timestamp create_time;







}
