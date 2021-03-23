## 開発ルール各種

### Git 開発フロー

- [Git Feature Flow](https://developers.gnavi.co.jp/entry/GitFeatureFlow/koyama)ベースで進める(テスト環境は今はなし)
  - 基本的に master から feature ブランチを切って作業し、プルリクをあげる
- feature ブランチ命名規則
  - 「feature/修正内容概要」の形で命名
    - ex) feature/create-detail-page
- 作業担当者は自分でプルリクを作成する
  - 特別局所的でない場合 Reviewer には基本全員を指定(見れる人がレビュー)
  - Asignees には自分を指定
- 作業担当者は Approve 後、ブランチのマージが可能になるので各自でマージをする

### タスク管理

使用ツール：[Clickup](https://app.clickup.com/3804003/v/b/li/18587649)

- ステータスについて
  - ICE BOX : 必須じゃないタスク（チョットやってみたい）
  - OPEN : やることリスト
  - READY : 着手できる状態
  - IN PROGRESS : 作業中
  - REVIEW : プルリクあげたら REVIEW に移動
  - CLOSED : プルリクが承認されて main に merge できたら CLOSED!!

### サンプルコード（そのうち削除予定）

[GitHub](https://github.com/mizushima1226/next-play-ground)
