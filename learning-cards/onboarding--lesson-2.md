# 實作 2｜看懂 Galaxy 和執行環境

進階 / onboarding

## 學習目標
- 能用自己的話說明「實作 2｜看懂 Galaxy 和執行環境」的主要角色或資料關係。
- 能辨認本課常見誤解，並說明應查驗的資料或證據。

## 前置能力
先完成平台、圖控與 AHU 基礎，或回查本課前置觀念。

## 原教材重點
- Galaxy 是專案組態的集合。Galaxy Repository 保存組態，IDE 用來編輯，AppEngine 執行部署後的應用物件。
- 畫出 IDE → Galaxy 組態 → AppEngine 執行的關係。
- 用 AHU001 舉例，分別描述設計時與執行時的工作。
- 在核准測試環境辨認 Galaxy、Platform、Engine 和 Area。
- 能指出應到哪裡編輯物件，以及到哪裡檢查執行狀態。

## 圖文對照
![相關圖解](../courses/modbus/assets/deploy.png)
沿用相關教材畫面輔助辨認本課角色與設定位置，非本課的實測結果；介面及欄位依版本不同。

## 常見問題
### 這一課應先掌握什麼？
Galaxy 是專案組態的集合。Galaxy Repository 保存組態，IDE 用來編輯，AppEngine 執行部署後的應用物件。

### Galaxy Repository 主要保存什麼？
工程組態與專案物件設定。組態與設備歷史資料屬不同責任，備份與查詢方式也不同。

### IDE 與 AppEngine 的基本差別為何？
IDE 編輯工程，AppEngine 執行已部署物件。設計環境與執行環境需分清，排錯才能找對位置。

## 記憶卡
- 問：Model View 與 Deployment View 分別適合看什麼？
  答：邏輯分類與實際部署位置。同一物件可從工程分類及執行拓樸兩種角度觀察。
- 問：在 IDE 看得到物件，就代表已在執行嗎？
  答：還需確認指派、部署與執行狀態。設計時建立物件並不等於它已部署至正確 Engine。
- 問：Area 的規劃應依什麼安排？
  答：專案設備或區域的管理需求。工程分類需能協助維護、警報範圍與設備定位。

## 實作與學習紀錄
以本課原教材的案例，記錄一項正常情境與一項異常情境，分別寫下預期結果、實際證據及待確認事項。

- 我的說明：
- 預期與實際結果：
- 待確認問題：

## 課後五題測驗

1. 下列哪項符合本課的教材重點？
   A. Galaxy 是專案組態的集合。Galaxy Repository 保存組態，IDE 用來編輯，AppEngine 執行部署後的應用物件。
   B. 所有設備的完整歷史曲線
   C. 電腦的每個使用者文件

2. 複習本課的操作與判讀原則，哪一項正確？
   A. AppEngine 只是圖片瀏覽器
   B. IDE 就是所有現場控制器
   C. 畫出 IDE → Galaxy 組態 → AppEngine 執行的關係。

3. IDE 與 AppEngine 的基本差別為何？
   A. IDE 就是所有現場控制器
   B. IDE 編輯工程，AppEngine 執行已部署物件
   C. AppEngine 只是圖片瀏覽器

4. 在 IDE 看得到物件，就代表已在執行嗎？
   A. 只要改過圖示就會執行
   B. 還需確認指派、部署與執行狀態
   C. 看得到名稱就已上線

5. Galaxy Repository 主要保存什麼？
   A. 工程組態與專案物件設定
   B. 所有設備的完整歷史曲線
   C. 電腦的每個使用者文件

## 答案與解析
1. A：本課原教材重點：Galaxy 是專案組態的集合。Galaxy Repository 保存組態，IDE 用來編輯，AppEngine 執行部署後的應用物件。
2. C：本課原教材重點：畫出 IDE → Galaxy 組態 → AppEngine 執行的關係。
3. B：設計環境與執行環境需分清，排錯才能找對位置。
4. B：設計時建立物件並不等於它已部署至正確 Engine。
5. A：組態與設備歷史資料屬不同責任，備份與查詢方式也不同。

## 原教材
https://chermanyen.github.io/fmcs-academy/courses/onboarding/index.html#lesson-2
概念與練習沿用本站原教材；版本、來源圖及限制仍以原教材標示為準。
