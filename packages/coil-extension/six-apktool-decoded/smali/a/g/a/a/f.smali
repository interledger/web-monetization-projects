.class La/g/a/a/f;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/g/a/a/h$a;->a(Landroid/graphics/Typeface;Landroid/os/Handler;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroid/graphics/Typeface;

.field final synthetic b:La/g/a/a/h$a;


# direct methods
.method constructor <init>(La/g/a/a/h$a;Landroid/graphics/Typeface;)V
    .locals 0

    iput-object p1, p0, La/g/a/a/f;->b:La/g/a/a/h$a;

    iput-object p2, p0, La/g/a/a/f;->a:Landroid/graphics/Typeface;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 2

    iget-object v0, p0, La/g/a/a/f;->b:La/g/a/a/h$a;

    iget-object v1, p0, La/g/a/a/f;->a:Landroid/graphics/Typeface;

    invoke-virtual {v0, v1}, La/g/a/a/h$a;->a(Landroid/graphics/Typeface;)V

    return-void
.end method
