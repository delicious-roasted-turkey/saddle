class MoneyFieldCallbacks

  NUM_DECS = 2
  private_constant :NUM_DECS

  def initialize(fields)
    @fields = fields
  end

  def before_save(model) 

    @fields.each do |f|
      val = model.read_attribute(f)
      new_val = val.round NUM_DECS
      if(!new_val.eql? val) then
        method_name = "#{f}="
        # model.price= new_val
        model.public_send(method_name, new_val)
      end

    end

  end

end

