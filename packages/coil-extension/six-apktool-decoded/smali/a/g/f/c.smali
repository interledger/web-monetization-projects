.class final La/g/f/c;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements La/g/f/k$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/g/f/f;->a(Landroid/content/Context;La/g/f/a;La/g/a/a/h$a;Landroid/os/Handler;ZII)Landroid/graphics/Typeface;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x8
    name = null
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "Ljava/lang/Object;",
        "La/g/f/k$a<",
        "La/g/f/f$c;",
        ">;"
    }
.end annotation


# instance fields
.field final synthetic a:La/g/a/a/h$a;

.field final synthetic b:Landroid/os/Handler;


# direct methods
.method constructor <init>(La/g/a/a/h$a;Landroid/os/Handler;)V
    .locals 0

    iput-object p1, p0, La/g/f/c;->a:La/g/a/a/h$a;

    iput-object p2, p0, La/g/f/c;->b:Landroid/os/Handler;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public a(La/g/f/f$c;)V
    .locals 2

    if-nez p1, :cond_0

    iget-object p1, p0, La/g/f/c;->a:La/g/a/a/h$a;

    const/4 v0, 0x1

    :goto_0
    iget-object v1, p0, La/g/f/c;->b:Landroid/os/Handler;

    invoke-virtual {p1, v0, v1}, La/g/a/a/h$a;->a(ILandroid/os/Handler;)V

    goto :goto_1

    :cond_0
    iget v0, p1, La/g/f/f$c;->b:I

    if-nez v0, :cond_1

    iget-object v0, p0, La/g/f/c;->a:La/g/a/a/h$a;

    iget-object p1, p1, La/g/f/f$c;->a:Landroid/graphics/Typeface;

    iget-object v1, p0, La/g/f/c;->b:Landroid/os/Handler;

    invoke-virtual {v0, p1, v1}, La/g/a/a/h$a;->a(Landroid/graphics/Typeface;Landroid/os/Handler;)V

    goto :goto_1

    :cond_1
    iget-object p1, p0, La/g/f/c;->a:La/g/a/a/h$a;

    goto :goto_0

    :goto_1
    return-void
.end method

.method public bridge synthetic a(Ljava/lang/Object;)V
    .locals 0

    check-cast p1, La/g/f/f$c;

    invoke-virtual {p0, p1}, La/g/f/c;->a(La/g/f/f$c;)V

    return-void
.end method
