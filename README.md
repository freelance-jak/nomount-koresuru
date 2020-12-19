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
