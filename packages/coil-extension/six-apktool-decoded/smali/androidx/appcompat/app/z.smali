.class Landroidx/appcompat/app/z;
.super Landroid/content/BroadcastReceiver;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Landroidx/appcompat/app/x$d;->d()V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/appcompat/app/x$d;


# direct methods
.method constructor <init>(Landroidx/appcompat/app/x$d;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/app/z;->a:Landroidx/appcompat/app/x$d;

    invoke-direct {p0}, Landroid/content/BroadcastReceiver;-><init>()V

    return-void
.end method


# virtual methods
.method public onReceive(Landroid/content/Context;Landroid/content/Intent;)V
    .locals 0

    iget-object p1, p0, Landroidx/appcompat/app/z;->a:Landroidx/appcompat/app/x$d;

    invoke-virtual {p1}, Landroidx/appcompat/app/x$d;->b()V

    return-void
.end method
