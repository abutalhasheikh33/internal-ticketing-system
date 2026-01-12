// models/user.model.ts
import { BaseAttributes } from '../../../utils/database/BaseAttributes';

import { DataTypes, Model, Sequelize } from 'sequelize';

export class User extends Model {
  declare id: string;
  declare email: string;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ...BaseAttributes,
      },
      {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        underscored: true
      }
    );
  }

  static associate(models: any) {
    // User.hasMany(models.Ticket, {
    //   foreignKey: 'created_by',
    //   as: 'created_tickets',
    // });

    // User.hasMany(models.Ticket, {
    //   foreignKey: 'current_assignee_id',
    //   as: 'assigned_tickets',
    // });

    // User.hasMany(models.UserRole, {
    //   foreignKey: 'user_id',
    //   as: 'user_roles',
    // });
  }
}
