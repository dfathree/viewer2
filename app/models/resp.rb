class Resp < ApplicationRecord
  belongs_to :thre
  validates :num, uniqueness: { scope: :thre_id }
end
