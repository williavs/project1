terraform {
  required_providers {
    linode = {
      source  = "linode/linode"
      version = "1.27.1"
    }
  }
}

provider "linode" {
  token = var.linode_token
}

resource "linode_instance" "web_server" {
  label     = "${var.app_name}-${var.environment}"
  image     = "linode/ubuntu20.04"
  region    = var.region
  type      = "g6-standard-1"
  root_pass = var.root_password

  provisioner "remote-exec" {
    inline = [
      "apt-get update",
      "apt-get install -y docker.io docker-compose",
      "systemctl start docker",
      "systemctl enable docker"
    ]
  }
}

resource "linode_domain" "app_domain" {
  domain   = var.domain_name
  soa_email = "admin@${var.domain_name}"
  type     = "master"
}

resource "linode_domain_record" "app_domain_record" {
  domain_id   = linode_domain.app_domain.id
  name        = var.environment
  record_type = "A"
  target      = linode_instance.web_server.ip_address
  ttl_sec     = 300
}