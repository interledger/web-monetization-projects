.class La/i/b/b;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/i/b/c;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/i/b/c;


# direct methods
.method constructor <init>(La/i/b/c;)V
    .locals 0

    iput-object p1, p0, La/i/b/b;->a:La/i/b/c;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 2

    iget-object v0, p0, La/i/b/b;->a:La/i/b/c;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, La/i/b/c;->b(I)V

    return-void
.end method
