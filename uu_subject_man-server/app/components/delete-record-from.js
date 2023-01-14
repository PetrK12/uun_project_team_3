"use-strict";
const { DaoFactory } = require("uu_appg01_server").ObjectStore;


class DeleteRecordFrom {
    daoMain;
    constructor(inName, fromName) {
        this.daoIn = DaoFactory.getDao(inName);
        this.daoFrom = DaoFactory.getDao(fromName)
    }

    async deleteRecord(awid, record, recordArrayName)
    {
        let pageInfo = {};
        pageInfo.pageSize = 100;
        pageInfo.pageIndex = 0;

        let fromList = await this.daoFrom.list(awid, "name", "asc", pageInfo);
        if (fromList.pageInfo.total > pageInfo.pageSize) {
            pageInfo.pageSize = fromList.pageInfo.total;
            fromList = await this.daoFrom.list(awid, "name", "asc", pageInfo);
        }
        let dataForUpdate = {};


        for (const item of fromList.itemList) {
          for (const deleteKey of item[recordArrayName])
          {
            if(deleteKey.id === record.id.toJSON())
            {
              dataForUpdate = item;
              dataForUpdate[recordArrayName] = item[recordArrayName].filter(x => x.id !== deleteKey.id);
              await this.daoFrom.update(dataForUpdate);
            }
          }
        }
    }

}
module.exports = DeleteRecordFrom;