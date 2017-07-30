require 'bundler/setup'
Bundler.require

require_relative "list"

def debug_params
  puts "PARAMS: #{params}"
end

get "/" do
  @title = "Your App Name"
  lists = List.load_all
  erb :"index.html", locals: {lists: lists}, layout: :"layout.html"
end

post "/lists/update" do
  debug_params
  list = List.new(params["id"])
  list.name = params["name"]
  items = params["items"].map do |item_hash|
    puts "creating Item from item_hash: #{item_hash}"
    Item.new(item_hash["name"], item_hash["status"])
  end
  list.items = items
  if params["toggle"]
    puts "Toggle: #{params["toggle"]}"
    list.toggle_item(params["toggle"])
  end
  if params["trash"]
    list.items.delete_at(params["trash"].to_i)
  end
  if params["js-trash-list"] == "1"
    List.delete_list
    redirect back
  end
  list.save!
  redirect back
end

post "/lists/:id/items/add" do
  debug_params
  list = List.new(params["id"])
  list.load_from_file
  puts "Creating item #{params['name']} for list #{params['id']}"
  if params["name"]
    list.add(params["name"])
    list.save!
  end
  redirect back
end

post "/lists" do
  debug_params
  list = List.new(params["id"])
  list.name = params["list-name"]
  list.save!
  redirect back
end